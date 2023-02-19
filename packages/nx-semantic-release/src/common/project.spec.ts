import path from "path";
import { getProject, GetProjectContext, getProjectDependencies, getProjectRoot } from "./project";
import { cleanupTestRepo } from "../tests/cleanup-test-repo";
import { setupTestRepo } from "../tests/setup-test-repo";
import { tmpProjPath } from "@nrwl/nx-plugin/testing";

describe("project", () => {
  beforeAll(async () => {
    await cleanupTestRepo();

    await setupTestRepo();
  });

  afterAll(async () => {
    await cleanupTestRepo();
  });

  const projectsConfigurations = {
    version: 1,
    projects: {
      "app-a": {
        root: "root"
      }
    }
  } satisfies GetProjectContext["projectsConfigurations"];

  describe("getProjectDependencies", () => {
    it.each<{ projectName: string; expectedDependencies: string[] }>([
      {
        projectName: "app-a",
        expectedDependencies: ["lib-a", "lib-a-dependency", "common-lib"]
      },
      {
        projectName: "app-b",
        expectedDependencies: ["common-lib"]
      },
      {
        projectName: "common-lib",
        expectedDependencies: []
      }
    ])("should return correct dependencies", async (data) => {
      const result = await getProjectDependencies(data.projectName);

      expect(result.dependencies).toEqual(data.expectedDependencies);
    });
  });

  describe("getProjectRoot", () => {
    it("should return correct project root", () => {
      const cwd = tmpProjPath();

      const result = getProjectRoot(projectsConfigurations.projects["app-a"], cwd);

      expect(result).toEqual(path.join(cwd, projectsConfigurations.projects["app-a"].root));
    });
  });

  describe("getProject", () => {
    it("should return project from workspace", () => {
      expect(
        getProject({
          cwd: tmpProjPath(),
          projectsConfigurations,
          projectName: "app-a"
        })
      ).toEqual(projectsConfigurations.projects["app-a"]);
    });
  });
});
