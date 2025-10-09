import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 totalRevenue = 124500;
  outstanding = 15750;
  expenses = 89200;
  netProfit = 35300;
  outstandingInvoices = 3;
  incomingCash = 45600;
  outgoingCash = 23400;
  netCashFlow = 22200;

  revenueData = [
    { label: 'Jan', value: 12000 },
    { label: 'Feb', value: 15000 },
    { label: 'Mar', value: 18000 },
    { label: 'Apr', value: 14000 },
    { label: 'May', value: 22000 },
    { label: 'Jun', value: 25000 },
    { label: 'Jul', value: 28000 },
    { label: 'Aug', value: 31000 },
    { label: 'Sep', value: 26000 },
    { label: 'Oct', value: 29000 },
    { label: 'Nov', value: 32000 },
    { label: 'Dec', value: 35000 }
  ];

  maxRevenue = Math.max(...this.revenueData.map(d => d.value));

  expenseCategories = [
    { category: 'Office Rent', amount: 25000, percentage: 28, color: '#3B82F6' },
    { category: 'Salaries', amount: 35000, percentage: 39, color: '#10B981' },
    { category: 'Marketing', amount: 12000, percentage: 13, color: '#F59E0B' },
    { category: 'Utilities', amount: 8000, percentage: 9, color: '#EF4444' },
    { category: 'Other', amount: 9200, percentage: 11, color: '#8B5CF6' }
  ];

  recentInvoices = [
    { client: 'Acme Corp', amount: 12500, date: new Date('2024-08-05'), status: 'Paid' },
    { client: 'Tech Solutions', amount: 8750, date: new Date('2024-08-03'), status: 'Pending' },
    { client: 'Design Co', amount: 15000, date: new Date('2024-08-01'), status: 'Overdue' },
    { client: 'StartupXYZ', amount: 6800, date: new Date('2024-07-30'), status: 'Paid' },
    { client: 'Enterprise Ltd', amount: 22000, date: new Date('2024-07-28'), status: 'Pending' }
  ];

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
}
}