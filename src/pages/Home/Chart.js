import { PieChart } from "react-minimal-pie-chart";
import { Chartcontainer, Chartitem } from 'components/Header/style';

const Chart = () => {
  const testdata = 30;
  return (
    <Chartcontainer>
      <Chartitem>
      <PieChart className="chart1"
        data={[
          {
            value: 20,
            color: "#F6CB44", 
            name: "name1",
          },
        ]}
        reveal= {20}
        lineWidth={18}
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        startAngle={-90}
        label={({dataEntry}) => dataEntry.value+"%"}
        labelStyle ={{
          fontSize: "26px", 
          fill: "#33333",
        }}
        labelPosition={0}
      />
      </Chartitem>

      <Chartitem>
      <PieChart className="chart2"
        data={[
          {
            value: 30,
            color: "#F6CB44", 
            name: "name1",
          },
        ]}
        reveal= {testdata}
        lineWidth={18}
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        startAngle={-90}
        label={({dataEntry}) => dataEntry.value+"%"}
        labelStyle ={{
          fontSize: "26px", 
          fill: "#33333",
        }}
        labelPosition={0}
      />
      </Chartitem>

      <Chartitem>
      <PieChart className="chart3"
        data={[
          {
            value: 40,
            color: "#F6CB44", 
            name: "name1",
          },
        ]}
        reveal= {40}
        lineWidth={18}
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        startAngle={-90}
        label={({dataEntry}) => dataEntry.value+"%"}
        labelStyle ={{
          fontSize: "26px", 
          fill: "#33333",
        }}
        labelPosition={0}
      />
      </Chartitem>
    </Chartcontainer>
  );
};

export default Chart;