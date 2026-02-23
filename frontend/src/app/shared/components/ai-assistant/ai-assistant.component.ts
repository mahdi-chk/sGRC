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

  constructor(private aiService: AIService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.checkIndexStatus();
    this.dashboardService.toggleAiAssistant$.subscribe(() => {
      this.isOpen = true; // Auto open when triggered
    });
    // Initial connection check
    this.aiService.chat('ping').subscribe({
      error: (err) => {
        if (err.error?.error?.includes('Ollama est inaccessible')) {
          this.messages.push({ role: 'ai', content: '⚠️ Le service Ollama n\'est pas lancé sur le serveur. Certaines fonctionnalités de l\'assistant pourraient être indisponibles.' });
        }
      }
    });
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

  sendMessage() {
    if (!this.prompt.trim()) return;

    const userMsg = this.prompt;
    this.messages.push({ role: 'user', content: userMsg });
    this.prompt = '';
    this.isLoading = true;

    this.aiService.chat(userMsg).subscribe({
      next: (res) => {
        this.messages.push({ role: 'ai', content: res.response });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('AI Error:', err);
        this.messages.push({ role: 'ai', content: 'Désolé, une erreur est survenue lors de la communication avec l\'IA.' });
        this.isLoading = false;
      }
    });
  }
}
