import { Test, TestingModule } from "@nestjs/testing";
import { OpenrouteService } from "./openroute.service";

describe("OpenrouteService", () => {
  let service: OpenrouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenrouteService],
    }).compile();

    service = module.get<OpenrouteService>(OpenrouteService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
