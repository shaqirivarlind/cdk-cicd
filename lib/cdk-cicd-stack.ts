import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, ShellStep, CodePipelineSource} from 'aws-cdk-lib/pipelines'

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'AwesomePipeline', {
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

  }
}
