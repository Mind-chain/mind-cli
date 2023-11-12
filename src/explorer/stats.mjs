import axios from 'axios';
import asciichart from 'asciichart';
import { urls } from '../constants.mjs';

async function fetchStats() {
  try {
    const response = await axios.get(urls.explorer+'stats');

    if (response.status === 200) {
      const data = response.data;

      console.log(`Mind Network Statistics:
-------------------------
Average Block Time: ${data.average_block_time / 1000} seconds
Coin Price: ${data.coin_price || 'N/A'}
Gas Prices:
  - Average: ${data.gas_prices.average}
  - Fast: ${data.gas_prices.fast}
  - Slow: ${data.gas_prices.slow}
Gas Used Today: ${data.gas_used_today}
Market Cap: ${data.market_cap || 'N/A'}
Network Utilization Percentage: ${data.network_utilization_percentage}%
Static Gas Price: ${data.static_gas_price || 'N/A'}
Total Addresses: ${data.total_addresses}
Total Blocks: ${data.total_blocks}
Total Gas Used: ${data.total_gas_used}
Total Transactions: ${data.total_transactions}
Transactions Today: ${data.transactions_today}`);

      if (data.network_utilization_percentage > 0) {
        const chart = asciichart.plot([data.network_utilization_percentage], {
          height: 6,
          colors: [asciichart.green],
        });
        console.log(`\nNetwork Utilization (Last 24 Hours):
${chart}`);
      }

      if (!isNaN(data.gas_used_today)) {
        const gasChart = asciichart.plot([data.gas_used_today], {
          height: 6,
          colors: [asciichart.blue],
        });
        console.log(`\nGas Used Today:
${gasChart}`);
      }

      if (!isNaN(data.transactions_today)) {
        const transactionsChart = asciichart.plot([data.transactions_today], {
          height: 6,
          colors: [asciichart.yellow],
        });
        console.log(`\nTransactions Today:
${transactionsChart}`);
      }

      setTimeout(() => {
        process.exit(0);
      }, 100);
    } else {
      console.error(`Failed to fetch data. Status: ${response.status}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    process.exit(1);
  }
}

export default fetchStats;
