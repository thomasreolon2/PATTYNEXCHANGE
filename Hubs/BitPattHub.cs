using BitPatt.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BitPatt.Hubs
{
    public class BitPattHub : Hub
    {
        public async Task NewBitSell(BitPatt_SELL bitsell)
        {
            await Clients.All.SendAsync("BitPattS_received", bitsell);
        }

    }
}
