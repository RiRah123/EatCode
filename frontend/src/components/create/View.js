import React from 'react'
import { useContext } from 'react'
import Text from './Text';

const View = ({ context, preview }) => {

  const inputs = useContext(context);

  return (
    <>
      <h2>{inputs.name}</h2>
      <h5>Time Limit: {inputs.time} second - Memory Limit: {inputs.memory} MB</h5>
      <Text text={inputs.problemText} />
      <h3>Input</h3>
      <Text text={inputs.input} />
      <h3>Output</h3>
      <Text text={inputs.output} />
      <h3>Example</h3>
      <p>Input:</p>
      <Text text={
        preview ? inputs.exampleInput : inputs.example.exampleInput
      } />
      <p>Output:</p>
      <Text text={
        preview ? inputs.exampleOutput : inputs.example.exampleOutput
      } />
      <p>Explanation:</p>
      <Text text={
        preview ? inputs.exampleText : inputs.example.exampleText
      } />
    </>
  )
}

export default View