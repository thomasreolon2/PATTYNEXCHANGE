using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BitPatt.Models
{
    public class BitPatt_SELL
    {
        public string clientuniqueid { get; set; }
        public string type { get; set; }
        public string amount { get; set; }
        public string unitprice { get; set; }
        public string total_price { get; set; }
        public DateTime date { get; set; }
    }
}