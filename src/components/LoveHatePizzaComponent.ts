import { Component, BaseComponent, Intents } from '@jovotech/framework';

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
    // Send a message up front
    await this.$send(YesNoOutput, { message: 'First message' });
    await this.$send({ message: 'Second message' });

    return this.$delegate(YesNoComponent, {
      resolve: {},
      config: {
        value: null,
      },
    });
  }

  lovesPizza() {
    return this.$send({ message: 'Yes! I love pizza, too.', listen: false });
  }

  hatesPizza() {
    return this.$send({ message: `That's OK! Not everyone likes pizza.`, listen: false });
  }

  UNHANDLED() {
    return this.START();
  }
}
