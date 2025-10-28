import { Construct } from 'constructs';
import {StackProps, Stage} from 'aws-cdk-lib'
import {LambdaStack} from './LambdaStack'

export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new LambdaStack(this, 'LambdaStack', {
      stageName: props.stackName
    })
  }
}
