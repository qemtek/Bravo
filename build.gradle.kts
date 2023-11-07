plugins {
    kotlin("js") version "1.7.20"
}

group = "me.christophercollins"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
}

kotlin {
    js {
        binaries.executable()
        nodejs {

        }
    }
}