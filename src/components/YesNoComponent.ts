import { Component, Intents, BaseComponent } from '@jovotech/framework';

@Component()
export class YesNoComponent extends BaseComponent<
  { numberOfTries: number },
  { output?: any; outputOpts: any }
> {
  START(): Promise<void> {
    this.$component.data.numberOfTries = 0;
    const { output, outputOpts } = this.$component.config!;

    if (!output) {
      return this.$send({ ...outputOpts, listen: true });
    }

    return this.$send(output, { ...outputOpts, listen: true });
  }

  @Intents(['YesIntent'])
  Yes(): Promise<void> {
    return this.$resolve('yes');
  }

  @Intents(['NoIntent'])
  No(): Promise<void> {
    return this.$resolve('no');
  }

  @Intents(['FallbackIntent'])
  UNHANDLED(): Promise<void> {
    this.$component.data.numberOfTries++;
    const { output, outputOpts } = this.$component.config!;

    if (this.$component.data.numberOfTries > 2) {
      return this.$resolve('fail');
    } else {
      if (!output) {
        return this.$send({ ...outputOpts, listen: true });
      }

      return this.$send(output, outputOpts);
    }
  }
}
