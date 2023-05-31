import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountStatementComponent } from './components/account-statement/account-statement.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { BetHistoryComponent } from './components/bet-history/bet-history.component';
import { CurrentBetsComponent } from './components/current-bets/current-bets.component';
import { MainWrapComponent } from './components/main-wrap/main-wrap.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ProfitLossComponent } from './components/profit-loss/profit-loss.component';
import { CasinoProfitlossComponent } from './components/casino-profitloss/casino-profitloss.component';
import { CasinoBethistoryComponent } from './components/casino-bethistory/casino-bethistory.component';
import { CasinoproductComponent } from './components/casinoproduct/casinoproduct.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SncasinoBetshistoryComponent } from './components/sncasinoreports/sncasino-betshistory/sncasino-betshistory.component';
import { SncasinoProfitlossComponent } from './components/sncasinoreports/sncasino-profitloss/sncasino-profitloss.component';
import { DwRequestsComponent } from './components/dw-requests/dw-requests.component';
import { SlotProfitlossComponent } from './components/slot-profitloss/slot-profitloss.component';
import { SlotBethistoryComponent } from './components/slot-bethistory/slot-bethistory.component';
import { WithdrawalbankdetailsComponent } from './components/withdrawaldetails/withdrawalbankdetails/withdrawalbankdetails.component';
import { WithdrawalupidetailsComponent } from './components/withdrawaldetails/withdrawalupidetails/withdrawalupidetails.component';
import { DisputeComponent } from './components/dispute/dispute.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { PokerBethistoryComponent } from './components/poker-bethistory/poker-bethistory.component';
import { BetgamesProfitlossComponent } from './betgames-profitloss/betgames-profitloss.component';
import { BetgamesBethistoryComponent } from './betgames-bethistory/betgames-bethistory.component';
import { AwcBethistoryComponent } from './components/awc-bethistory/awc-bethistory.component';
import { AwcProfitlossComponent } from './components/awc-profitloss/awc-profitloss.component';

const routes: Routes = [
  {
    path: '',
    component: MainWrapComponent,
    children: [
      { path: '', component: MyAccountComponent },
      { path: 'detail', component: MyAccountComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'account_statement', component: AccountStatementComponent },
      { path: 'dw_requests', component: DwRequestsComponent },
      { path: 'bank_details', component: WithdrawalbankdetailsComponent },
      { path: 'upi_details', component: WithdrawalupidetailsComponent },
      { path: 'current_bets', component: CurrentBetsComponent },
      { path: 'bet_history', component: BetHistoryComponent },
      { path: 'profit_loss', component: ProfitLossComponent },
      { path: 'activity_log', component: ActivityLogComponent },
      { path: 'dispute', component: DisputeComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'casino_profit_loss', component: CasinoProfitlossComponent },
      { path: 'casino_bet_history', component: CasinoBethistoryComponent },
      { path: 'casino_product', component: CasinoproductComponent },
      { path: 'sncasino_bets_history', component: SncasinoBetshistoryComponent },
      { path: 'sncasino_profit_loss', component: SncasinoProfitlossComponent },
      { path: 'slot_profit_loss', component: SlotProfitlossComponent },
      { path: 'slot_bet_history', component: SlotBethistoryComponent },
      { path: 'betgames_profit_loss', component: BetgamesProfitlossComponent },
      { path: 'betgames_bet_history', component: BetgamesBethistoryComponent },
      { path: 'awc_bet_history', component: AwcBethistoryComponent },
      { path: 'awc_profit_loss', component: AwcProfitlossComponent },
      { path: 'poker_bets_history', component: PokerBethistoryComponent },


    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
