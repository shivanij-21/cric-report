import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl: string;


  constructor(private http: HttpClient,private main: MainService) {
    main.apis$.subscribe((res) => {
      this.baseUrl = res.ip;
    });
   }


  balance() {
    return this.http.get(`${this.baseUrl}/ping`);
  }
  
  logTransaction() {
    return this.http.get(`${this.baseUrl}/logTransaction`);
  }
  AccountStatement(fromDate: string, toDate: string,filter: string) {
    return this.http.get(
      `${this.baseUrl}/betsReport?from=${fromDate}&to=${toDate}&filter=${filter}`
    );
  }

  currentBets() {
    return this.http.get(`${this.baseUrl}/currentBets`);
  }

  BetHistory(fromDate: string, toDate: string, betStatus: string) {
    return this.http.get(
      `${this.baseUrl}/betsHistory?from=${fromDate}&to=${toDate}&type=${betStatus}`
    );
  }

  SlotBetHistory(fromDate: string, toDate: string, betStatus: string) {
    return this.http.get(
      `${this.baseUrl}/casinoSlotBetsHistory?from=${fromDate}&to=${toDate}&type=${betStatus}`
    );
  }

  SlotProfitLoss(fromDate: string, toDate: string) {
    return this.http.get(
      `${this.baseUrl}/casinoSlotProfitLoss?from=${fromDate}&to=${toDate}`
    );
  }
  casinoBGBetsHistory(fromDate: string, toDate: string, betStatus: string) {
    return this.http.get(
      `${this.baseUrl}/casinoBGBetsHistory?from=${fromDate}&to=${toDate}&type=${betStatus}`
    );
  }

  CasinoBGProfitLoss(fromDate: string, toDate: string) {
    return this.http.get(
      `${this.baseUrl}/casinoBGProfitLoss?from=${fromDate}&to=${toDate}`
    );
  }
  casinoAWCBetsHistory(fromDate: string, toDate: string, betStatus: string) {
    return this.http.get(
      `${this.baseUrl}/casinoAWCBetsHistory?from=${fromDate}&to=${toDate}&type=${betStatus}`
    );
  }

  CasinoAWCProfitLoss(fromDate: string, toDate: string) {
    return this.http.get(
      `${this.baseUrl}/casinoAWCProfitLoss?from=${fromDate}&to=${toDate}`
    );
  }
  ProfitLoss(fromDate: string, toDate: string) {

    return this.http.get(
      `${this.baseUrl}/profitLoss?from=${fromDate}&to=${toDate}`
    );
  }
  CasinoBetHistory(fromDate: string, toDate: string, betStatus: string) {
    return this.http.get(
      `${this.baseUrl}/casinoBetsHistory?from=${fromDate}&to=${toDate}&type=${betStatus}`
    );
  }

  CasinoProfitLoss(fromDate: string, toDate: string) {
    return this.http.get(
      `${this.baseUrl}/casinoProfitLoss?from=${fromDate}&to=${toDate}`
    );
  }
  SNCasinoBetHistory(fromDate: string, toDate: string, betStatus: string) {
    return this.http.get(
      `${this.baseUrl}/casinoSNBetsHistory?from=${fromDate}&to=${toDate}&type=${betStatus}`
    );
  }

  SNCasinoProfitLoss(fromDate: string, toDate: string) {
    return this.http.get(
      `${this.baseUrl}/casinoSNProfitLoss?from=${fromDate}&to=${toDate}`
    );
  }

  PokerBetHistory(fromDate: string, toDate: string) {
    return this.http.get(
      `https://222222.digital/pad=82/pokerLog?from=${fromDate}&to=${toDate}`
    );
  }
  logActivity() {
    return this.http.get(`${this.baseUrl}/logActivity`);
  }
  CasinoProduct() {
    return this.http.get(`https://333333.digital/pad=82/listCasinoProduct`);
  }

  getRequests(uid,status,type,from,to){
    return this.http.get(`https://social.cricbuzzer.io:15552/api/getClientPaymentReport/?uid=${uid}&status=${status}&type=${type}&from=${from}&to=${to}`);
  }
}
