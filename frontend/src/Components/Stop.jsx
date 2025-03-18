import React, { useState, useEffect } from 'react';

const Stop = ({StopInterview}) => {
    return (
        <div className="timer floating-stop" onClick={StopInterview}>
            Quit
        </div>
    );
};

export default Stop;
