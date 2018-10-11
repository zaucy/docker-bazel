ARG GCC_VERSION=latest
FROM gcc:${GCC_VERSION}

RUN apt-get -y update &&\
  apt-get -y install pkg-config zip g++ zlib1g-dev unzip python

ARG BAZEL_VERSION=0.17.2

RUN curl -L -o bazel-installer.sh https://github.com/bazelbuild/bazel/releases/download/${BAZEL_VERSION}/bazel-${BAZEL_VERSION}-installer-linux-x86_64.sh

RUN chmod +x bazel-installer.sh && ./bazel-installer.sh

RUN bazel version

ENTRYPOINT ["/usr/local/bin/bazel"]
CMD [""]
