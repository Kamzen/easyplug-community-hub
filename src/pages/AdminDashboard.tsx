
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  ChevronDown, 
  Users, 
  ShieldCheck, 
  Settings, 
  FileText, 
  BarChart3,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Activity,
  UserCheck,
  UserX
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Dummy data for admin charts
  const userGrowthData = [
    { name: 'Jan', users: 400, sellers: 100 },
    { name: 'Feb', users: 600, sellers: 150 },
    { name: 'Mar', users: 800, sellers: 200 },
    { name: 'Apr', users: 1200, sellers: 280 },
    { name: 'May', users: 1600, sellers: 350 },
    { name: 'Jun', users: 2000, sellers: 420 },
  ];

  const platformRevenueData = [
    { name: 'Week 1', revenue: 12000 },
    { name: 'Week 2', revenue: 15000 },
    { name: 'Week 3', revenue: 18000 },
    { name: 'Week 4', revenue: 22000 },
  ];

  const categoryPerformanceData = [
    { name: 'Electronics', transactions: 850 },
    { name: 'Vehicles', transactions: 420 },
    { name: 'Property', transactions: 280 },
    { name: 'Services', transactions: 650 },
    { name: 'Food', transactions: 380 },
  ];

  const usersData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'User', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Seller', status: 'Active', joinDate: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', type: 'User', status: 'Suspended', joinDate: '2024-01-05' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', type: 'Seller', status: 'Pending', joinDate: '2024-01-20' },
  ];

  const moderationData = [
    { id: 1, product: 'iPhone 14 Pro', seller: 'Tech Store', status: 'Pending Review', flagged: 'Fake Product', date: '2024-01-15' },
    { id: 2, product: 'Samsung Watch', seller: 'Gadget Shop', status: 'Approved', flagged: 'None', date: '2024-01-14' },
    { id: 3, product: 'MacBook Pro', seller: 'Electronics Hub', status: 'Rejected', flagged: 'Misleading Description', date: '2024-01-13' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-card shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">EasyPlug Admin</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                  <User className="w-4 h-4 mr-2" />
                  {user.name || 'Admin'}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar with vertical tabs */}
        <div className="w-64 bg-card shadow-sm min-h-screen border-r">
          <div className="p-6">
            <Tabs defaultValue="dashboard" orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-rows-5 h-auto p-1 bg-muted">
                <TabsTrigger value="dashboard" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="users" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <Users className="w-4 h-4" />
                  User Management
                </TabsTrigger>
                <TabsTrigger value="moderation" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <ShieldCheck className="w-4 h-4" />
                  Product Moderation
                </TabsTrigger>
                <TabsTrigger value="reports" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <FileText className="w-4 h-4" />
                  Reports
                </TabsTrigger>
                <TabsTrigger value="settings" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <Settings className="w-4 h-4" />
                  System Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsContent value="dashboard" className="space-y-6">
              <h2 className="text-3xl font-bold">Admin Dashboard</h2>
              
              {/* Platform Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,450</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Active Sellers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">420</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Total Listings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8,650</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Platform Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R 2.4M</div>
                    <p className="text-xs text-muted-foreground">+22% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stackId="1" 
                          stroke="#ff6b35" 
                          fill="#ff6b35" 
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sellers" 
                          stackId="1" 
                          stroke="#f7931e" 
                          fill="#f7931e" 
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={platformRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#ff6b35" 
                          strokeWidth={3}
                          dot={{ fill: '#ff6b35', r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={categoryPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="transactions" fill="#ff6b35" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">User Management</h2>
                <Button>Export Users</Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.type === 'Seller' ? 'default' : 'secondary'}>
                              {user.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              user.status === 'Active' ? 'default' : 
                              user.status === 'Suspended' ? 'destructive' : 'outline'
                            }>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <UserCheck className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <UserX className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Product Moderation</h2>
                <Button variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  View Flagged Items
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Products Under Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {moderationData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.product}</TableCell>
                          <TableCell>{item.seller}</TableCell>
                          <TableCell>
                            <Badge variant={
                              item.status === 'Approved' ? 'default' : 
                              item.status === 'Rejected' ? 'destructive' : 'outline'
                            }>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.flagged}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Approve</Button>
                              <Button size="sm" variant="destructive">Reject</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <h2 className="text-3xl font-bold">System Reports</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      User Activity Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Sales Performance Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Platform Analytics Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Security Audit Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Daily Active Users</span>
                      <span className="font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Registrations Today</span>
                      <span className="font-bold">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Products Listed Today</span>
                      <span className="font-bold">123</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transactions Today</span>
                      <span className="font-bold">67</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-3xl font-bold">System Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platformName">Platform Name</Label>
                      <Input id="platformName" defaultValue="EasyPlug" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input id="supportEmail" defaultValue="support@easyplug.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                      <Input id="commissionRate" defaultValue="5" type="number" />
                    </div>
                    <Button>Save Platform Settings</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Input id="maxLoginAttempts" defaultValue="5" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input id="sessionTimeout" defaultValue="30" type="number" />
                    </div>
                    <Button>Update Security Settings</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
