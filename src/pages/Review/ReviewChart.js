import { PieChart } from "react-minimal-pie-chart";
import { Chartcontainer, Chartitem } from 'components/Header/style';
import {useRecoilState} from 'recoil';
import {ratingAvg} from '../../Atom';
import { useEffect } from "react";
import './Review.css';

const Chart = () => {
  const rating = 30;
  const [rateAvg, setRateAvg] = useRecoilState(ratingAvg);
  const distance = (rateAvg)/5*100;
  console.log(distance);

  return (
    <div className='Chartcontainer'>
      <PieChart className="piechart"
        data={[
          {
            value: rateAvg,
            color: "#F6CB44", 
            name: "reviewrating",
          },
        ]}
        reveal= {distance}
        lineWidth={30}
        background="#f3f3f3"
        lengthAngle={360}
        // animate
        startAngle={-90}
        label={({dataEntry}) => dataEntry.value}
        labelStyle ={{
          fontSize: "26px", 
          fill: "#33333",
        }}
        labelPosition={0}
      />
    </div>
  );
};

export default Chart;