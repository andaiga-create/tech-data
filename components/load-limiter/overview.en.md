## Overview

The Load Limiter detects overload on hoists/cranes and similar lifting equipment using a strain-gauge load cell (electronic J-1 type), preventing personal injury and property damage caused by overloading before it happens.

This document is based on the **SHINHAN ELECTRONICS SH-1200A Load Limiter**.

> ℹ This manual is based on a delivery document for the "Tech Flower, HHI Navy DF-Cheonji-RB-SI, 3-ton RIB Davit Crane" project (Document No. D0LB231023, Rev. 0, dated 2023.10.23). When applying this to a different project/crane, the SIG1/SIG2/SIG3 setpoints and other settings must be re-configured to match that crane's actual rating.

### System Composition

The SH-1200A load limiter system consists of 4 units:

- **Load Limit Controller (SH-1200A)** — load display, alarm/cutoff decision, and relay output
- **Load Cell (SPE-6.5T)** — strain-gauge load sensing element
- **4-20mA Converter (SBCA-X)** — transmits the load signal as 4-20mA for long-distance transmission (option)
- **Large Display (SLD-404)** — large-format remote load display

### Key Features

- Detects overload at high speed and fixed precision regardless of start-up time
- Built-in circuit distinguishes momentary load swing ("inching") from real overload, preventing false trips
- Semiconductor charge/discharge circuit improves overload-detection timing accuracy
- Detection is based on actual applied load rather than purely electrical estimation, improving reliability
- 4-digit display allows direct readout of both the setpoint and the current load
- Compact design with high parts interchangeability for easy maintenance

### Key Functions

- Real-time load display (4-digit)
- 3-stage relay output: SIG (intermediate alarm) / ALARM (overload alarm) / OVER (cutoff)
- Automatic reset once the load drops back below the OVER setpoint
- Overload detection time within 1 second
