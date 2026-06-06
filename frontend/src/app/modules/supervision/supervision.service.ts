import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { finalize, shareReplay, take, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SupervisionSummary {
  healthScore: number;
  status: string;
  activeAlerts: number;
  keyRecommendations: number;
  monitoredDomains: number;
  nextReview: string;
}

export interface SupervisionBestPractice {
  id: string;
  title: string;
  framework: string;
  category: string;
  applicability: string;
  summary: string;
  linkedModule: string;
  priority: string;
  tags: string[];
}

export interface SupervisionRecommendation {
  id: string;
  title: string;
  priority: string;
  status: string;
  rationale: string;
  expectedImpact: string;
  owner: string;
  sourceModule: string;
  route: string;
}

export interface SupervisionBenchmarkIndicator {
  id: string;
  label: string;
  organizationValue: number;
  benchmarkValue: number;
  unit: string;
  gap: number;
  interpretation: string;
}

export interface SupervisionBenchmarkMaturity {
  domain: string;
  organizationScore: number;
  benchmarkScore: number;
}

export interface SupervisionSupportChannel {
  id: string;
  title: string;
  responseTime: string;
  scope: string;
  actionLabel: string;
}

export interface SupervisionFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SupervisionPlaybook {
  id: string;
  title: string;
  duration: string;
  outcome: string;
  linkedModule: string;
}

export interface SupervisionAlert {
  id: string;
  severity: string;
  title: string;
  detail: string;
  route: string;
  owner: string;
}

export interface SupervisionHealthTrendPoint {
  label: string;
  score: number;
}

export interface SupervisionScoreBreakdown {
  label: string;
  score: number;
  target: number;
}

export interface SupervisionWatchItem {
  id: string;
  title: string;
  detail: string;
  tone: string;
}

export interface SupervisionOverview {
  generatedAt: string;
  summary: SupervisionSummary;
  modules: {
    bestPractices: SupervisionBestPractice[];
    recommendations: SupervisionRecommendation[];
    benchmarks: {
      sector: string;
      updatedAt: string;
      indicators: SupervisionBenchmarkIndicator[];
      maturity: SupervisionBenchmarkMaturity[];
    };
    assistance: {
      channels: SupervisionSupportChannel[];
      faqs: SupervisionFaqItem[];
      playbooks: SupervisionPlaybook[];
    };
    continuousMonitoring: {
      status: string;
      focus: string;
      alerts: SupervisionAlert[];
      healthTrend: SupervisionHealthTrendPoint[];
      breakdown: SupervisionScoreBreakdown[];
      watchlist: SupervisionWatchItem[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class SupervisionService {
  private readonly apiUrl = `${environment.apiUrl}/supervision`;
  private readonly overviewSubject = new ReplaySubject<SupervisionOverview>(1);
  private request$?: Observable<SupervisionOverview>;
  private hasLoaded = false;

  constructor(private http: HttpClient) {}

  watchOverview(): Observable<SupervisionOverview> {
    return this.overviewSubject.asObservable();
  }

  loadOverview(forceRefresh = false): Observable<SupervisionOverview> {
    if (this.request$) {
      return this.request$;
    }

    if (this.hasLoaded && !forceRefresh) {
      return this.watchOverview().pipe(take(1));
    }

    this.request$ = this.http.get<SupervisionOverview>(`${this.apiUrl}/overview`).pipe(
      tap(overview => {
        this.hasLoaded = true;
        this.overviewSubject.next(overview);
      }),
      finalize(() => {
        this.request$ = undefined;
      }),
      shareReplay(1)
    );

    return this.request$;
  }
}
