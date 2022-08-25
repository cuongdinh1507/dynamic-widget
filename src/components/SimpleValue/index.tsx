import React from "react";

interface SimpleValueProps {
    data: ListSensorState
}

const SimpleValue = ({ data }: SimpleValueProps) => {
	return <div>{`${data?.sensor}: ${data?.value} (${data?.unit})`}</div>
};

export default SimpleValue;
