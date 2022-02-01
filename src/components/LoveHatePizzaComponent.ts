import { Component, BaseComponent, Intents, PrioritizedOverUnhandled } from '@jovotech/framework';

import { YesNoOutput } from '../output/YesNoOutput';
import { YesNoComponent } from '../components/YesNoComponent';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component({ components: [YesNoComponent] })
export class LoveHatePizzaComponent extends BaseComponent {
  async START() {
    return this.$delegate(YesNoComponent, {
      resolve: {
        yes: this.lovesPizza,
      },
      config: {
        outputOpts: {
          message: 'Do you like pizza?',
        },
      },
    });
  }

  lovesPizza() {
    return this.$send({ message: 'Yes! I love pizza, too.', listen: false });
  }

  @Intents(['NoGoodIntent'])
  @PrioritizedOverUnhandled()
  hatesPizza() {
    return this.$resolve('fail');
  }

  UNHANDLED() {
    return this.START();
  }
}
