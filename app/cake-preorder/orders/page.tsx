'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebas'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [])

  // ... rest of the component remains the same
}