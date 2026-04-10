import { Component, OnInit } from '@angular/core';
import {
  SupervisionFaqItem,
  SupervisionPlaybook,
  SupervisionService,
  SupervisionSupportChannel
} from './supervision.service';

@Component({
  selector: 'app-supervision-assistance',
  templateUrl: './supervision-assistance.component.html',
  styleUrls: ['./supervision-assistance.component.scss']
})
export class SupervisionAssistanceComponent implements OnInit {
  channels: SupervisionSupportChannel[] = [];
  faqs: SupervisionFaqItem[] = [];
  playbooks: SupervisionPlaybook[] = [];
  openedFaqId: string | null = null;

  constructor(private supervisionService: SupervisionService) {}

  ngOnInit(): void {
    this.supervisionService.getOverview().subscribe(overview => {
      this.channels = overview.modules.assistance.channels;
      this.faqs = overview.modules.assistance.faqs;
      this.playbooks = overview.modules.assistance.playbooks;
      this.openedFaqId = this.faqs.length > 0 ? this.faqs[0].id : null;
    });
  }

  toggleFaq(id: string): void {
    this.openedFaqId = this.openedFaqId === id ? null : id;
  }
}
