export default class MathUtils {
  static IsPowerOf2(value) {
    return (value & (value - 1)) === 0
  }
}
