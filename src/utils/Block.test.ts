import proxyquire from "proxyquire";
import { expect } from "chai";
import sinon from "sinon";

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { default: Block } = proxyquire("./Block", {
  "./EventBus": {
    EventBus: class {
      on = eventBusMock.on;
      emit = eventBusMock.emit;
    },
  },
}) as any;

describe("Block", () => {
  class ComponentMock extends Block {}
  const block = new ComponentMock();

  it("should fire init event on initialization", () => {
    expect(eventBusMock.emit.calledWith("init")).to.eq(true);
  });

  it("block have id", () => {
    expect(block.id).to.be.a("string");
  });

  it("setProps() works correctly", () => {
    block.setProps({ text: "text" });
    expect(block.props).to.have.property("text");
  });

  it("should not return null for children", () => {
    expect(block.children).to.be.not.null;
  });
});
