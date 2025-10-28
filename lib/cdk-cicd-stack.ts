import { Construct } from 'constructs';
import {CodePipeline, ShellStep, CodePipelineSource} from 'aws-cdk-lib/pipelines'
import {PipelineStage} from './PipelineStage'
import {Stack, StackProps} from 'aws-cdk-lib'

export class CdkCicdStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AwesomePipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('shaqirivarlind/cdk-cicd', 'cicd-practice'),
        commands: [
          // 'cd cdk-cicd', // this is the path in case if you have multiple project in one root
          'npm ci',
          'npx cdk synth'
        ],
        // primaryOutputDirectory: 'cdk-cicd/cdk.out', // this is the path in case if you have multiple project in one root
      })
    })

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
      stackName: 'test'
    }))

  }
}
