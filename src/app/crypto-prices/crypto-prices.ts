import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crypto-prices',
  imports: [ CommonModule, HttpClientModule  ],
  templateUrl: './crypto-prices.html',
  styleUrl: './crypto-prices.css'
})
export class CryptoPrices {
prices: { [key: string]: number } = {};

  constructor(private http: HttpClient) {
    this.getPrices();

    // Actualiza cada 5 minutos
    setInterval(() => this.getPrices(), 300000);
  }

  getPrices(): void {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,binancecoin,xrp,litecoin,dogecoin,shiba-inu,tether,usd-coin,dai&vs_currencies=usd';

    this.http.get<any>(url).subscribe({
      next: data => {
        this.prices = {
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd,
          SOL: data.solana.usd,
          ADA: data.cardano.usd,
          BNB: data.binancecoin.usd,
          XRP: data.xrp.usd,
          LTC: data.litecoin.usd,
          DOGE: data.dogecoin.usd,
          SHIB: data['shiba-inu'].usd,
          USDT: data.tether.usd,
          USDC: data['usd-coin'].usd,
          DAI: data.dai.usd
        };
      },
      error: err => console.error('Error al obtener precios de criptomonedas:', err)
    });
  }
  

}
