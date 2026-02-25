import { Component, OnInit } from '@angular/core';
import { AIService } from '../../../core/services/ai.service';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent implements OnInit {
  isOpen = false;
  prompt = '';
  messages: { role: 'user' | 'ai', content: string }[] = [];
  isLoading = false;
  isIndexed = false;
  isIndexing = false;

  sessionId = '';
  private abortController: AbortController | null = null;

  constructor(private aiService: AIService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.checkIndexStatus();
    this.sessionId = sessionStorage.getItem('ai_session_id') || this.generateSessionId();
    sessionStorage.setItem('ai_session_id', this.sessionId);

    this.dashboardService.toggleAiAssistant$.subscribe(() => {
      this.isOpen = true; // Auto open when triggered
    });
  }

  generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  checkIndexStatus() {
    this.aiService.getStatus().subscribe({
      next: (res) => this.isIndexed = res.isInitialized,
      error: (err) => console.error('Error checking index status:', err)
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  stopGeneration() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
      this.isLoading = false;
    }
  }

  startIndexing() {
    this.isIndexing = true;
    this.aiService.indexNormes().subscribe({
      next: (res) => {
        if (res.success) {
          this.isIndexed = true;
          this.messages.push({ role: 'ai', content: `Indexation terminée ! ${res.count} fragments de documents ont été indexés.` });
        }
        this.isIndexing = false;
      },
      error: (err) => {
        console.error('Indexing error:', err);
        this.messages.push({ role: 'ai', content: 'Erreur lors de l\'indexation des documents.' });
        this.isIndexing = false;
      }
    });
  }

  async sendMessage() {
    if (!this.prompt.trim()) return;

    const userMsg = this.prompt;
    this.messages.push({ role: 'user', content: userMsg });
    this.prompt = '';
    this.isLoading = true;

    // Add empty AI message for streaming
    const aiMsgIndex = this.messages.push({ role: 'ai', content: '' }) - 1;

    this.abortController = new AbortController();

    try {
      const stream = this.aiService.chatStream(userMsg, this.sessionId, this.abortController.signal);
      for await (const chunk of stream) {
        this.messages[aiMsgIndex].content += chunk;
        this.isLoading = false; // Stop spinner once first chunk arrives
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        this.messages[aiMsgIndex].content += ' [Génération interrompue]';
      } else {
        console.error('AI Error:', err);
        this.messages[aiMsgIndex].content = 'Désolé, une erreur est survenue lors de la communication avec l\'IA.';
      }
    } finally {
      this.isLoading = false;
      this.abortController = null;
    }
  }
}
