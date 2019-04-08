/**
 * @module firebase.firestore
 * A Timestamp represents a point in time independent of any time zone or calendar, 
 * represented as seconds and fractions of seconds at nanosecond resolution in UTC 
 * Epoch time. It is encoded using the Proleptic Gregorian Calendar which extends 
 * the Gregorian calendar backwards to year one. It is encoded assuming all minutes 
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second table 
 * is needed for interpretation. Range is from 0001-01-01T00:00:00Z to 
 * 9999-12-31T23:59:59.999999999Z.
 */
class Timestamp {

  /**
   * Creates a new timestamp.
   * @param {Number} seconds The number of seconds of UTC time since Unix epoch 
   * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.
   * @param {Number} nanoseconds The non-negative fractions of a second at 
   * nanosecond resolution. Negative second values with fractions must still have 
   * non-negative nanoseconds values that count forward in time. Must be from 
   * 0 to 999,999,999 inclusive.
   */
  constructor(seconds, nanoseconds) {
    if (nanoseconds < 0) {
      throw new FirestoreError(
        Code.INVALID_ARGUMENT,
        'Timestamp nanoseconds out of range: ' + nanoseconds
      );
    }
    if (nanoseconds >= 1e9) {
      throw new FirestoreError(
        Code.INVALID_ARGUMENT,
        'Timestamp nanoseconds out of range: ' + nanoseconds
      );
    }
    // Midnight at the beginning of 1/1/1 is the earliest Firestore supports.
    if (seconds < -62135596800) {
      throw new FirestoreError(
        Code.INVALID_ARGUMENT,
        'Timestamp seconds out of range: ' + seconds
      );
    }
    // This will break in the year 10,000.
    if (seconds >= 253402300800) {
      throw new FirestoreError(
        Code.INVALID_ARGUMENT,
        'Timestamp seconds out of range: ' + seconds
      );
    }
    this.seconds = seconds
    this.nanoseconds = nanoseconds
  }

  /**
   * Creates a new timestamp from the given date.
   * @param {Date} date The date to initialize the Timestamp from.
   * @return {MockTimestamp} A new timestamp from the given date.
   */
  static fromDate(date) {
    return Timestamp.fromMillis(date.getTime());
  }

  /**
   * Creates a new timestamp from the given number of milliseconds.
   * @param {Number} milliseconds Number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   * @return {MockTimestamp} A new timestamp from the given date.
   */
  static fromMillis(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const nanos = (milliseconds - seconds * 1000) * 1e6;
    return new Timestamp(seconds, nanos);
  }

  /**
   * Creates a new timestamp with the current date, with millisecond precision
   * @return {MockTimestamp} A new timestamp from the given date.
   */
  static now() {
    return Timestamp.fromMillis(Date.now());
  }

  /**
   * Returns 'true' if this Timestamp is equal to the provided one.
   * @param {*} other The Timestamp to compare against.
   * @return {MockTimestamp} A new timestamp from the given date.
   */
  isEqual(other) {
    return (
      other.seconds === this.seconds && other.nanoseconds === this.nanoseconds
    );
  }

  /**
   * Returns a new Date corresponding to this timestamp. This may lose precision.
   * @return {Date} JavaScript Date object representing the same point in time as 
   * this Timestamp, with millisecond precision.
   */
  toDate() {
    return new Date(this.toMillis());
  }

  /**
   * Returns the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   * @return {Number} The point in time corresponding to this timestamp, 
   * represented as the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   */
  toMillis() {
    return this.seconds * 1000 + this.nanoseconds / 1e6;
  }

  toString() {
    return (
      'Timestamp(seconds=' +
      this.seconds +
      ', nanoseconds=' +
      this.nanoseconds +
      ')'
    );
  }
}

module.exports = Timestamp