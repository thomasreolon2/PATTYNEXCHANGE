import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { BitPatt_SELL } from '../models/bitsell_sell';

@Injectable()
export class BitPatService {
  BitPattS_received = new EventEmitter<BitPatt_SELL>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendBitSell(bitsell_sell: BitPatt_SELL) {
    this._hubConnection.invoke('NewBitSell', bitsell_sell);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(window.location.href + 'BitPattHub',{
        skipNegotiation: true,
transport: signalR.HttpTransportType.WebSockets
      })
      
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('BitPattS_received', (data: any) => {
      this.BitPattS_received.emit(data);
       console.log(data)
    });
  }
}  