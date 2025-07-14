
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  User, 
  ShoppingCart, 
  Heart, 
  Package, 
  FileText, 
  RotateCcw, 
  Star 
} from "lucide-react";

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'personal-details';

  // Mock data
  const orderData = [
    { id: 'ORD001', date: '2024-01-15', total: 'R 1,250', status: 'Delivered', items: 3 },
    { id: 'ORD002', date: '2024-01-10', total: 'R 890', status: 'Shipped', items: 2 },
    { id: 'ORD003', date: '2024-01-05', total: 'R 2,100', status: 'Processing', items: 5 },
  ];

  const cartData = [
    { id: 1, name: 'iPhone 14 Pro', price: 'R 18,999', quantity: 1, image: '/placeholder.svg' },
    { id: 2, name: 'Samsung Galaxy Watch', price: 'R 3,499', quantity: 2, image: '/placeholder.svg' },
    { id: 3, name: 'AirPods Pro', price: 'R 4,299', quantity: 1, image: '/placeholder.svg' },
  ];

  const wishlistData = [
    { id: 1, name: 'MacBook Pro M3', price: 'R 32,999', image: '/placeholder.svg' },
    { id: 2, name: 'Sony WH-1000XM5', price: 'R 6,999', image: '/placeholder.svg' },
    { id: 3, name: 'iPad Air', price: 'R 12,999', image: '/placeholder.svg' },
  ];

  const invoiceData = [
    { id: 'INV001', orderId: 'ORD001', date: '2024-01-15', amount: 'R 1,250', status: 'Paid' },
    { id: 'INV002', orderId: 'ORD002', date: '2024-01-10', amount: 'R 890', status: 'Paid' },
    { id: 'INV003', orderId: 'ORD003', date: '2024-01-05', amount: 'R 2,100', status: 'Pending' },
  ];

  const returnData = [
    { id: 'RET001', orderId: 'ORD001', product: 'iPhone Case', reason: 'Defective', status: 'Approved', date: '2024-01-20' },
    { id: 'RET002', orderId: 'ORD002', product: 'Bluetooth Speaker', reason: 'Wrong Size', status: 'Processing', date: '2024-01-18' },
  ];

  const reviewData = [
    { id: 1, product: 'iPhone 14 Pro', rating: 5, review: 'Excellent product, very satisfied!', date: '2024-01-16' },
    { id: 2, product: 'Samsung Watch', rating: 4, review: 'Good quality, fast delivery.', date: '2024-01-12' },
    { id: 3, product: 'AirPods Pro', rating: 5, review: 'Amazing sound quality!', date: '2024-01-08' },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="flex gap-6">
          {/* Sidebar with vertical tabs */}
          <div className="w-64 flex-shrink-0">
            <Tabs value={activeTab} orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-rows-7 h-auto p-1 bg-muted">
                <TabsTrigger value="personal-details" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <User className="w-4 h-4" />
                  Personal Details
                </TabsTrigger>
                <TabsTrigger value="cart" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <Heart className="w-4 h-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="orders" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <Package className="w-4 h-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="invoices" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <FileText className="w-4 h-4" />
                  Invoices
                </TabsTrigger>
                <TabsTrigger value="returns" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <RotateCcw className="w-4 h-4" />
                  Returns
                </TabsTrigger>
                <TabsTrigger value="reviews" className="w-full justify-start gap-2 data-[state=active]:bg-background">
                  <Star className="w-4 h-4" />
                  Reviews
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="personal-details">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+27 123 456 789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue="123 Market Street, Polokwane, 0700" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cart">
                <Card>
                  <CardHeader>
                    <CardTitle>Shopping Cart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              <Button variant="destructive" size="sm">Remove</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {wishlistData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button size="sm">Add to Cart</Button>
                                <Button variant="outline" size="sm">Remove</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderData.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>
                              <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                                {order.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoices">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoiceData.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.orderId}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell>
                              <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm">Download</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="returns">
                <Card>
                  <CardHeader>
                    <CardTitle>Returns & Refunds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Return ID</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {returnData.map((returnItem) => (
                          <TableRow key={returnItem.id}>
                            <TableCell>{returnItem.id}</TableCell>
                            <TableCell>{returnItem.orderId}</TableCell>
                            <TableCell>{returnItem.product}</TableCell>
                            <TableCell>{returnItem.reason}</TableCell>
                            <TableCell>
                              <Badge variant={returnItem.status === 'Approved' ? 'default' : 'secondary'}>
                                {returnItem.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{returnItem.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reviewData.map((review) => (
                        <div key={review.id} className="border p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{review.product}</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{review.review}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
