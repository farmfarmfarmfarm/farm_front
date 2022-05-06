import { PieChart } from "react-minimal-pie-chart";

const Chart = () => {
  return (
    <div className="piechart">
      <PieChart 
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
    </div>
  );
};

export default Chart;