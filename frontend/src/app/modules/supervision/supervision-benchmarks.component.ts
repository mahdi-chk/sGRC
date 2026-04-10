import { Component, OnInit } from '@angular/core';
import {
  SupervisionBenchmarkIndicator,
  SupervisionBenchmarkMaturity,
  SupervisionService
} from './supervision.service';

@Component({
  selector: 'app-supervision-benchmarks',
  templateUrl: './supervision-benchmarks.component.html',
  styleUrls: ['./supervision-benchmarks.component.scss']
})
export class SupervisionBenchmarksComponent implements OnInit {
  sector = '';
  indicators: SupervisionBenchmarkIndicator[] = [];
  maturity: SupervisionBenchmarkMaturity[] = [];

  constructor(private supervisionService: SupervisionService) {}

  ngOnInit(): void {
    this.supervisionService.getOverview().subscribe(overview => {
      this.sector = overview.modules.benchmarks.sector;
      this.indicators = overview.modules.benchmarks.indicators;
      this.maturity = overview.modules.benchmarks.maturity;
    });
  }
}
