```javascript
import {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { InputNumber } from "antd";
import type { InputNumberProps } from "antd/es/input-number";

interface IProps extends InputNumberProps {
  stepControlOnly?: boolean;
}

const DInputNumber = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { stepControlOnly, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  const disableInput = useCallback(() => {
    if (stepControlOnly && inputRef.current) {
      inputRef.current.setAttribute("readonly", "true");
    }
  }, [stepControlOnly]);
  useEffect(() => {
    disableInput();
  }, [disableInput]);
  return <InputNumber {...rest} ref={inputRef} />;
});

export default DInputNumber;
```

使用 `ref` 将 `input` 设置为 `readOnly` 状态，如果要让 `key` 事件也取消，设置为 `disabled` 状态即可。

`input` 在 `focus` 状态下会监听 `keyboard` 事件
