import { Component } from '@angular/core';
import { AIService } from '../../../core/services/ai.service';

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent {
  isOpen = false;
  prompt = '';
  messages: { role: 'user' | 'ai', content: string }[] = [];
  isLoading = false;

  constructor(private aiService: AIService) { }

  toggleChat() {
    this.isOpen = !this.isOpen;
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
