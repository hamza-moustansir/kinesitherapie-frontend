// components/payments/Stats.js
import { Line } from 'react-chartjs-2';

const PaymentStats = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/paiements/stats');
      setData(res.data);
    };
    fetchData();
  }, []);

  return <Line data={data} />;
};