import {Link,Outlet,useNavigate} from "react-router-dom";
import {LogOut} from "lucide-react";
import {useAuthStore} from "../store/auth.store";

export function AppLayout(){
 const {user,logout}=useAuthStore(); const nav=useNavigate(); const role=user?.role||"CUSTOMER";
 const admin=[
  ["/admin/dashboard","Dashboard"],["/admin/customers","Customers"],["/admin/riders","Riders"],["/admin/pickup-plans","Pickup Plans"],["/admin/pickups","Orders / Pickups"],["/admin/carriers","Carriers"],["/admin/coverage-areas","Coverage Areas"],["/admin/addon-services","Add-on Services"],["/admin/pricing","Pricing"],["/admin/payments","Payments"],["/admin/notifications","Notifications"],["/admin/reports","Reports"],["/admin/settings","Settings"],["/admin/users","Users / Roles"],["/admin/audit-logs","Audit Logs"]
 ];
 const customer=[["/customer/dashboard","Dashboard"],["/customer/profile","Profile"],["/customer/business","Business Details"],["/customer/addresses","Addresses"],["/customer/book-pickup","Pickup Booking"],["/customer/pickups","Pickup History"],["/customer/upcoming","Upcoming Pickups"],["/customer/payments","Payment Methods"],["/customer/invoices","Invoices"],["/customer/notifications","Notifications"],["/customer/support","Support"]];
 const rider=[["/rider/dashboard","Dashboard"],["/rider/pickups","Assigned Pickups"],["/rider/history","History"],["/rider/notifications","Notifications"],["/rider/profile","Profile"]];
 const links=role==="ADMIN"?admin:role==="RIDER"?rider:customer;
 return <div className="flex min-h-screen"><aside className="hidden w-64 overflow-y-auto bg-brand-blue text-white md:block"><div className="p-6 text-2xl font-black">Pickup<span className="text-brand-orange">Pro</span></div><nav className="space-y-1 p-4">{links.map(([u,l])=><Link className="block rounded-xl px-4 py-3 hover:bg-white/10" to={u} key={u}>{l}</Link>)}</nav></aside><main className="flex-1"><header className="flex justify-between border-b bg-white px-6 py-4"><div><p className="text-sm text-slate-500">{role}</p><b>{user?.name}</b></div><button onClick={()=>{logout();nav("/login")}} className="flex gap-2 text-slate-600"><LogOut size={18}/>Logout</button></header><div className="p-6"><Outlet/></div></main></div>
}