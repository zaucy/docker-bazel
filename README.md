# Docker images that contain bazel
Source of dockerfiles that create docker image [zaucy/bazel](https://hub.docker.com/r/zaucy/bazel/)

## Bazel with GCC

Latest bazel version `0.20.0`
Repository: https://github.com/zaucy/docker-bazel

### Tag format

```
zaucy/bazel:[<version>-]<compiler>[-<compiler-version>]
```

### Compilers available

 * [gcc](https://hub.docker.com/_/gcc/)

### Examples

* `zaucy/bazel:gcc`
* `zaucy/bazel:gcc-8`
* `zaucy/bazel:0.19.0-gcc-8`
* `zaucy/bazel:0.17.2-gcc-8.2`
* `zaucy/bazel:0.17.2-gcc-8.2.0`
* `zaucy/bazel:gcc-4`
