import { useState } from 'react';

export const useStateVar = <S>(initialState: S | (() => S)): [S, () => void, (o: Partial<S>) => void] => {
    const [, stateChanged] = useState({});
    function render() { stateChanged({}); }
    const [state] = useState(initialState);
    function setState(obj: Partial<S>) {
        Object.assign(state, obj);
        stateChanged({});
    }
    (state as any).set = setState;
    (state as any).changed = render;
    return [state, render, setState];
};

function createDebouncedRender(render: () => void, timeout_ms = 100) {
    const debouncedRender: (() => void) & { renderWaiting?: boolean } = () => {
        debouncedRender.renderWaiting = true;
        (debouncedRender as any).renderTimer = setTimeout(() => debouncedRender.renderWaiting && render(), timeout_ms);
    };
    return debouncedRender;
}

export const useDebouncedRender = (render: () => void, timeout_ms = 100) => {
    const [debouncedRender] = useState(() => createDebouncedRender(render, timeout_ms));
    debouncedRender.renderWaiting = false;
    return debouncedRender;
};
