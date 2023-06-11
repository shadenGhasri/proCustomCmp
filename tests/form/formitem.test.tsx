import ProForm, { ProFormText } from '@ant-design/pro-form';
import { fireEvent, render } from '@testing-library/react';
import { Input } from 'antd';

describe('ProForm.Item', () => {
  it('📦 ProForm support fieldProps.onBlur', async () => {
    const onBlur = jest.fn();
    const { container } = render(
      <ProForm
        initialValues={{
          navTheme: 'dark',
        }}
      >
        <ProFormText
          fieldProps={{
            id: 'navTheme',
            onBlur: (e) => onBlur(e.target.value),
          }}
          name="navTheme"
        />
      </ProForm>,
    );

    fireEvent.focus(container.querySelector('input#navTheme')!);
    fireEvent.blur(container.querySelector('input#navTheme')!);

    expect(onBlur).toBeCalledWith('dark');
    expect(onBlur).toBeCalledTimes(1);
  });

  it('📦 ProForm.Item supports onChange', async () => {
    const onChange = jest.fn();
    const onValuesChange = jest.fn();
    const { container } = render(
      <ProForm
        initialValues={{
          navTheme: 'dark',
        }}
        onValuesChange={({ name }) => onValuesChange(name)}
      >
        <ProForm.Item name="name">
          <Input onChange={(e) => onChange(e.target.value)} id="name" />
        </ProForm.Item>
      </ProForm>,
    );

    fireEvent.change(container.querySelector('input#name')!, {
      target: {
        value: '1212',
      },
    });

    expect(onChange).toBeCalledWith('1212');
    expect(onChange).toBeCalledTimes(1);
    expect(onValuesChange).toBeCalledWith('1212');
    expect(onValuesChange).toBeCalledTimes(1);
  });
});
