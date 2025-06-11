import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { BrandScore } from '@/types';

interface BrandScoreRadarChartProps {
  scores: BrandScore;
}

const BrandScoreRadarChart = ({ scores }: BrandScoreRadarChartProps) => {
  // Transform scores object into array format for Recharts
  const data = [
    {
      subject: 'Consistency',
      score: scores.consistency,
      fullMark: 100,
    },
    {
      subject: 'Content',
      score: scores.contentQuality,
      fullMark: 100,
    },
    {
      subject: 'Visibility',
      score: scores.visibility,
      fullMark: 100,
    },
    {
      subject: 'Competitive',
      score: scores.competitive,
      fullMark: 100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Brand Score"
          dataKey="score"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default BrandScoreRadarChart;