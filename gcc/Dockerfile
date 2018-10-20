ARG COMPILER_VERSION
FROM alpine

RUN apk add --no-cache curl

ARG BAZEL_VERSION

RUN curl -L -o bazel-installer.sh https://github.com/bazelbuild/bazel/releases/download/${BAZEL_VERSION}/bazel-${BAZEL_VERSION}-installer-linux-x86_64.sh

FROM gcc:${COMPILER_VERSION}

RUN apt-get -y update &&\
  apt-get -y install pkg-config zip g++ zlib1g-dev unzip python

COPY --from=0 bazel-installer.sh ./

RUN chmod +x bazel-installer.sh && ./bazel-installer.sh && rm -f ./bazel-installer.sh

RUN bazel version

ENTRYPOINT ["/usr/local/bin/bazel"]
CMD [""]
