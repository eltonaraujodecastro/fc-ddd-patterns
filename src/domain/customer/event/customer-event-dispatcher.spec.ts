import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./custumer-address-changed.event";
import CustomerCreatedEvent from "./custumer-created.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log-handler.handler";

import EnviaConsoleLog1Handler from "./handler/envia-console-log1-handler.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2-handler.handler";


describe("Domain Customer events tests", () => {

  it("should notify customer created event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
    const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, "handle");
    const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();
  });

  it("should notify customer address changed event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
    const spyEnviaConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", enviaConsoleLogHandler);


    const customer = new Customer("123", "Customer 1");
    const addressInicial = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = addressInicial;

    const addressFinal = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer.changeAddress(addressFinal);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEnviaConsoleLogHandler).toHaveBeenCalled();

  });
});
