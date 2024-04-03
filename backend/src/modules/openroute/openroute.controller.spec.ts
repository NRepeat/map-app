import { Test, TestingModule } from "@nestjs/testing";
import { OpenrouteController } from "./openroute.controller";

describe("OpenrouteController", () => {
  let controller: OpenrouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenrouteController],
    }).compile();

    controller = module.get<OpenrouteController>(OpenrouteController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
