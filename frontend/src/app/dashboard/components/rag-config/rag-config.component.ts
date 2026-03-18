import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-rag-config',
    templateUrl: './rag-config.component.html',
    styles: [`
        .config-card {
            border-left: 5px solid #6366f1;
            background: linear-gradient(to bottom, #ffffff, #f5f3ff);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            text-align: center;
        }
        .header-icon {
            font-size: 2.5rem;
            color: #818cf8;
            margin-bottom: 0.5rem;
        }
        h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
        }
        .desc {
            font-size: 0.95rem;
            color: #475569;
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        .btn-launch {
            background: #6366f1;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;
            width: 100%;
        }
        .btn-launch:hover {
            background: #4f46e5;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
        }
    `]
})
export class RagConfigComponent {
    constructor(private router: Router) {}

    openManager() {
        this.router.navigate(['/dashboard/rag-manager']);
    }
}
