import { Component, NgZone } from '@angular/core';
import { BitPatt_SELL } from '../models/bitsell_sell';
import { BitPatService } from '../services/bitpat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ClientApp';
  txtAmount: string = '';
  txtUnit_price: string = '';
  uniqueID: string = new Date().getTime().toString();
  bitsells = new Array<BitPatt_SELL>();
  bitsell_sell = new BitPatt_SELL();
  constructor(
    private bitPatService: BitPatService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }
  sendBitSell(): void {
    if (this.txtAmount) {
      this.bitsell_sell = new BitPatt_SELL();
      this.bitsell_sell.clientuniqueid = this.uniqueID;
      this.bitsell_sell.type = "sent";
      this.bitsell_sell.amount = this.txtAmount;
      this.bitsell_sell.unitprice = this.txtUnit_price;
      var test = Number(this.txtUnit_price) * Number(this.txtAmount);
      this.bitsell_sell.total_price = String(test);
      this.bitsell_sell.date = new Date();
      this.bitsells.push(this.bitsell_sell);
      this.bitPatService.sendBitSell(this.bitsell_sell);
      this.txtAmount = '';
      this.txtUnit_price = '';
    }
  }
  private subscribeToEvents(): void {

    this.bitPatService.BitPattS_received.subscribe((bitsell_sell: BitPatt_SELL) => {
      this._ngZone.run(() => {
        if (bitsell_sell.clientuniqueid !== this.uniqueID) {
          bitsell_sell.type = "received";
          this.bitsells.push(bitsell_sell);
        }
      });
    });
  }
}