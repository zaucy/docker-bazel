const fs = require('fs-extra');
const jsYaml = require('js-yaml');

async function generate() {

  const config = jsYaml.safeLoad(await fs.readFile('config.yml', 'utf-8'));

  const services = {};

  config.bazel.versions.unshift('');

  const defaultBazelVersion = config.bazel.default;

  for(let bazelVersion of config.bazel.versions) {

    bazelVersion = bazelVersion.toString();

    let bazelImgTitle = bazelVersion;

    if(bazelImgTitle) {
      bazelImgTitle += '-';
    }

    for(let {name, versions, default: defaultVersion} of config.compilers) {
      const baseServiceName = ('bazel-' + bazelImgTitle + name).replace(/\./g, '-');
      const baseTagName = bazelImgTitle + name;
      const imageName = 'zaucy/bazel';
  
      services[baseServiceName] = {
        image: `${imageName}:${baseTagName}`,
        build: {
          context: name,
          args: [
            `BAZEL_VERSION=${bazelVersion || defaultBazelVersion}`,
            `COMPILER_VERSION=${defaultVersion}`,
          ],
        },
      }
  
      for(let version of versions) {
        version = version.toString();

        const serviceName = (baseServiceName + '-' + version).replace(/\./g, '-');
        const tagName = baseTagName + '-' + version;
  
        services[serviceName] = {
          image: `${imageName}:${tagName}`,
          build: {
            context: name,
            args: [
              `BAZEL_VERSION=${bazelVersion || defaultBazelVersion}`,
              `COMPILER_VERSION=${version}`,
            ],
          },
        };
      }
    }
  }

  await fs.writeFile(
    `${__dirname}/docker-compose.yml`,
    jsYaml.safeDump({version: '3', services}),
  );
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
