/** @format */

'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
	{ name: 'Jan', value: 400 },
	{ name: 'Feb', value: 300 },
	{ name: 'Mar', value: 200 },
	{ name: 'Apr', value: 278 },
	{ name: 'May', value: 189 },
];

const tableData = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
];

export default function MainContent() {
	return (
		<motion.main
			className='flex-1 overflow-y-auto p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			<h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
				<Card>
					<CardHeader>
						<CardTitle>Total Users</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-3xl font-bold'>1,234</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-3xl font-bold'>$12,345</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Active Projects</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-3xl font-bold'>42</p>
					</CardContent>
				</Card>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Monthly Sales</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer
							width='100%'
							height={300}>
							<BarChart data={data}>
								<XAxis dataKey='name' />
								<YAxis />
								<Bar
									dataKey='value'
									fill='#8884d8'
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Recent Customers</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tableData.map((row) => (
									<TableRow key={row.id}>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.status}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</motion.main>
	);
}
