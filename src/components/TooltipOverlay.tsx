import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import Popper from "popper.js";
import Placement = Popper.Placement;

interface props {
    tooltipText: string;
    placement: Placement;
    children: React.ReactElement;
}

const TooltipOverlay = ({tooltipText, placement, children}: props) => {
    return (
        <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={
                <Tooltip>
                    <strong>{tooltipText}</strong>
                </Tooltip>
            }
        >
            {children}
        </OverlayTrigger>
    );
}

export default TooltipOverlay;
