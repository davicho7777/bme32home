
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SensorData
 * 
 */
export type SensorData = $Result.DefaultSelection<Prisma.$SensorDataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SensorData
 * const sensorData = await prisma.sensorData.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more SensorData
   * const sensorData = await prisma.sensorData.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.sensorData`: Exposes CRUD operations for the **SensorData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SensorData
    * const sensorData = await prisma.sensorData.findMany()
    * ```
    */
  get sensorData(): Prisma.SensorDataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SensorData: 'SensorData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "sensorData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SensorData: {
        payload: Prisma.$SensorDataPayload<ExtArgs>
        fields: Prisma.SensorDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SensorDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SensorDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>
          }
          findFirst: {
            args: Prisma.SensorDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SensorDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>
          }
          findMany: {
            args: Prisma.SensorDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>[]
          }
          create: {
            args: Prisma.SensorDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>
          }
          createMany: {
            args: Prisma.SensorDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SensorDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>[]
          }
          delete: {
            args: Prisma.SensorDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>
          }
          update: {
            args: Prisma.SensorDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>
          }
          deleteMany: {
            args: Prisma.SensorDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SensorDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SensorDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>[]
          }
          upsert: {
            args: Prisma.SensorDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorDataPayload>
          }
          aggregate: {
            args: Prisma.SensorDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensorData>
          }
          groupBy: {
            args: Prisma.SensorDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.SensorDataCountArgs<ExtArgs>
            result: $Utils.Optional<SensorDataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    sensorData?: SensorDataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model SensorData
   */

  export type AggregateSensorData = {
    _count: SensorDataCountAggregateOutputType | null
    _avg: SensorDataAvgAggregateOutputType | null
    _sum: SensorDataSumAggregateOutputType | null
    _min: SensorDataMinAggregateOutputType | null
    _max: SensorDataMaxAggregateOutputType | null
  }

  export type SensorDataAvgAggregateOutputType = {
    temperature: number | null
    humidity: number | null
    pressure: number | null
    rssi: number | null
    uptime: number | null
    heapFree: number | null
  }

  export type SensorDataSumAggregateOutputType = {
    temperature: number | null
    humidity: number | null
    pressure: number | null
    rssi: number | null
    uptime: bigint | null
    heapFree: number | null
  }

  export type SensorDataMinAggregateOutputType = {
    id: string | null
    deviceId: string | null
    temperature: number | null
    humidity: number | null
    pressure: number | null
    rssi: number | null
    uptime: bigint | null
    heapFree: number | null
    lastError: string | null
    createdAt: Date | null
  }

  export type SensorDataMaxAggregateOutputType = {
    id: string | null
    deviceId: string | null
    temperature: number | null
    humidity: number | null
    pressure: number | null
    rssi: number | null
    uptime: bigint | null
    heapFree: number | null
    lastError: string | null
    createdAt: Date | null
  }

  export type SensorDataCountAggregateOutputType = {
    id: number
    deviceId: number
    temperature: number
    humidity: number
    pressure: number
    rssi: number
    uptime: number
    heapFree: number
    lastError: number
    createdAt: number
    _all: number
  }


  export type SensorDataAvgAggregateInputType = {
    temperature?: true
    humidity?: true
    pressure?: true
    rssi?: true
    uptime?: true
    heapFree?: true
  }

  export type SensorDataSumAggregateInputType = {
    temperature?: true
    humidity?: true
    pressure?: true
    rssi?: true
    uptime?: true
    heapFree?: true
  }

  export type SensorDataMinAggregateInputType = {
    id?: true
    deviceId?: true
    temperature?: true
    humidity?: true
    pressure?: true
    rssi?: true
    uptime?: true
    heapFree?: true
    lastError?: true
    createdAt?: true
  }

  export type SensorDataMaxAggregateInputType = {
    id?: true
    deviceId?: true
    temperature?: true
    humidity?: true
    pressure?: true
    rssi?: true
    uptime?: true
    heapFree?: true
    lastError?: true
    createdAt?: true
  }

  export type SensorDataCountAggregateInputType = {
    id?: true
    deviceId?: true
    temperature?: true
    humidity?: true
    pressure?: true
    rssi?: true
    uptime?: true
    heapFree?: true
    lastError?: true
    createdAt?: true
    _all?: true
  }

  export type SensorDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorData to aggregate.
     */
    where?: SensorDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorData to fetch.
     */
    orderBy?: SensorDataOrderByWithRelationInput | SensorDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SensorDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SensorData
    **/
    _count?: true | SensorDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorDataMaxAggregateInputType
  }

  export type GetSensorDataAggregateType<T extends SensorDataAggregateArgs> = {
        [P in keyof T & keyof AggregateSensorData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensorData[P]>
      : GetScalarType<T[P], AggregateSensorData[P]>
  }




  export type SensorDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorDataWhereInput
    orderBy?: SensorDataOrderByWithAggregationInput | SensorDataOrderByWithAggregationInput[]
    by: SensorDataScalarFieldEnum[] | SensorDataScalarFieldEnum
    having?: SensorDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorDataCountAggregateInputType | true
    _avg?: SensorDataAvgAggregateInputType
    _sum?: SensorDataSumAggregateInputType
    _min?: SensorDataMinAggregateInputType
    _max?: SensorDataMaxAggregateInputType
  }

  export type SensorDataGroupByOutputType = {
    id: string
    deviceId: string
    temperature: number
    humidity: number
    pressure: number
    rssi: number | null
    uptime: bigint | null
    heapFree: number | null
    lastError: string | null
    createdAt: Date
    _count: SensorDataCountAggregateOutputType | null
    _avg: SensorDataAvgAggregateOutputType | null
    _sum: SensorDataSumAggregateOutputType | null
    _min: SensorDataMinAggregateOutputType | null
    _max: SensorDataMaxAggregateOutputType | null
  }

  type GetSensorDataGroupByPayload<T extends SensorDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorDataGroupByOutputType[P]>
            : GetScalarType<T[P], SensorDataGroupByOutputType[P]>
        }
      >
    >


  export type SensorDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    rssi?: boolean
    uptime?: boolean
    heapFree?: boolean
    lastError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sensorData"]>

  export type SensorDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    rssi?: boolean
    uptime?: boolean
    heapFree?: boolean
    lastError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sensorData"]>

  export type SensorDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    rssi?: boolean
    uptime?: boolean
    heapFree?: boolean
    lastError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sensorData"]>

  export type SensorDataSelectScalar = {
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    rssi?: boolean
    uptime?: boolean
    heapFree?: boolean
    lastError?: boolean
    createdAt?: boolean
  }

  export type SensorDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceId" | "temperature" | "humidity" | "pressure" | "rssi" | "uptime" | "heapFree" | "lastError" | "createdAt", ExtArgs["result"]["sensorData"]>

  export type $SensorDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SensorData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deviceId: string
      temperature: number
      humidity: number
      pressure: number
      rssi: number | null
      uptime: bigint | null
      heapFree: number | null
      lastError: string | null
      createdAt: Date
    }, ExtArgs["result"]["sensorData"]>
    composites: {}
  }

  type SensorDataGetPayload<S extends boolean | null | undefined | SensorDataDefaultArgs> = $Result.GetResult<Prisma.$SensorDataPayload, S>

  type SensorDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SensorDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SensorDataCountAggregateInputType | true
    }

  export interface SensorDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SensorData'], meta: { name: 'SensorData' } }
    /**
     * Find zero or one SensorData that matches the filter.
     * @param {SensorDataFindUniqueArgs} args - Arguments to find a SensorData
     * @example
     * // Get one SensorData
     * const sensorData = await prisma.sensorData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SensorDataFindUniqueArgs>(args: SelectSubset<T, SensorDataFindUniqueArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SensorData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SensorDataFindUniqueOrThrowArgs} args - Arguments to find a SensorData
     * @example
     * // Get one SensorData
     * const sensorData = await prisma.sensorData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SensorDataFindUniqueOrThrowArgs>(args: SelectSubset<T, SensorDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorDataFindFirstArgs} args - Arguments to find a SensorData
     * @example
     * // Get one SensorData
     * const sensorData = await prisma.sensorData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SensorDataFindFirstArgs>(args?: SelectSubset<T, SensorDataFindFirstArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorDataFindFirstOrThrowArgs} args - Arguments to find a SensorData
     * @example
     * // Get one SensorData
     * const sensorData = await prisma.sensorData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SensorDataFindFirstOrThrowArgs>(args?: SelectSubset<T, SensorDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SensorData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SensorData
     * const sensorData = await prisma.sensorData.findMany()
     * 
     * // Get first 10 SensorData
     * const sensorData = await prisma.sensorData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sensorDataWithIdOnly = await prisma.sensorData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SensorDataFindManyArgs>(args?: SelectSubset<T, SensorDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SensorData.
     * @param {SensorDataCreateArgs} args - Arguments to create a SensorData.
     * @example
     * // Create one SensorData
     * const SensorData = await prisma.sensorData.create({
     *   data: {
     *     // ... data to create a SensorData
     *   }
     * })
     * 
     */
    create<T extends SensorDataCreateArgs>(args: SelectSubset<T, SensorDataCreateArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SensorData.
     * @param {SensorDataCreateManyArgs} args - Arguments to create many SensorData.
     * @example
     * // Create many SensorData
     * const sensorData = await prisma.sensorData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SensorDataCreateManyArgs>(args?: SelectSubset<T, SensorDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SensorData and returns the data saved in the database.
     * @param {SensorDataCreateManyAndReturnArgs} args - Arguments to create many SensorData.
     * @example
     * // Create many SensorData
     * const sensorData = await prisma.sensorData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SensorData and only return the `id`
     * const sensorDataWithIdOnly = await prisma.sensorData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SensorDataCreateManyAndReturnArgs>(args?: SelectSubset<T, SensorDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SensorData.
     * @param {SensorDataDeleteArgs} args - Arguments to delete one SensorData.
     * @example
     * // Delete one SensorData
     * const SensorData = await prisma.sensorData.delete({
     *   where: {
     *     // ... filter to delete one SensorData
     *   }
     * })
     * 
     */
    delete<T extends SensorDataDeleteArgs>(args: SelectSubset<T, SensorDataDeleteArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SensorData.
     * @param {SensorDataUpdateArgs} args - Arguments to update one SensorData.
     * @example
     * // Update one SensorData
     * const sensorData = await prisma.sensorData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SensorDataUpdateArgs>(args: SelectSubset<T, SensorDataUpdateArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SensorData.
     * @param {SensorDataDeleteManyArgs} args - Arguments to filter SensorData to delete.
     * @example
     * // Delete a few SensorData
     * const { count } = await prisma.sensorData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SensorDataDeleteManyArgs>(args?: SelectSubset<T, SensorDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SensorData
     * const sensorData = await prisma.sensorData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SensorDataUpdateManyArgs>(args: SelectSubset<T, SensorDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorData and returns the data updated in the database.
     * @param {SensorDataUpdateManyAndReturnArgs} args - Arguments to update many SensorData.
     * @example
     * // Update many SensorData
     * const sensorData = await prisma.sensorData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SensorData and only return the `id`
     * const sensorDataWithIdOnly = await prisma.sensorData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SensorDataUpdateManyAndReturnArgs>(args: SelectSubset<T, SensorDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SensorData.
     * @param {SensorDataUpsertArgs} args - Arguments to update or create a SensorData.
     * @example
     * // Update or create a SensorData
     * const sensorData = await prisma.sensorData.upsert({
     *   create: {
     *     // ... data to create a SensorData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SensorData we want to update
     *   }
     * })
     */
    upsert<T extends SensorDataUpsertArgs>(args: SelectSubset<T, SensorDataUpsertArgs<ExtArgs>>): Prisma__SensorDataClient<$Result.GetResult<Prisma.$SensorDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SensorData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorDataCountArgs} args - Arguments to filter SensorData to count.
     * @example
     * // Count the number of SensorData
     * const count = await prisma.sensorData.count({
     *   where: {
     *     // ... the filter for the SensorData we want to count
     *   }
     * })
    **/
    count<T extends SensorDataCountArgs>(
      args?: Subset<T, SensorDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SensorData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorDataAggregateArgs>(args: Subset<T, SensorDataAggregateArgs>): Prisma.PrismaPromise<GetSensorDataAggregateType<T>>

    /**
     * Group by SensorData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SensorDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SensorDataGroupByArgs['orderBy'] }
        : { orderBy?: SensorDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SensorDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SensorData model
   */
  readonly fields: SensorDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SensorData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SensorDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SensorData model
   */
  interface SensorDataFieldRefs {
    readonly id: FieldRef<"SensorData", 'String'>
    readonly deviceId: FieldRef<"SensorData", 'String'>
    readonly temperature: FieldRef<"SensorData", 'Float'>
    readonly humidity: FieldRef<"SensorData", 'Float'>
    readonly pressure: FieldRef<"SensorData", 'Float'>
    readonly rssi: FieldRef<"SensorData", 'Int'>
    readonly uptime: FieldRef<"SensorData", 'BigInt'>
    readonly heapFree: FieldRef<"SensorData", 'Int'>
    readonly lastError: FieldRef<"SensorData", 'String'>
    readonly createdAt: FieldRef<"SensorData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SensorData findUnique
   */
  export type SensorDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * Filter, which SensorData to fetch.
     */
    where: SensorDataWhereUniqueInput
  }

  /**
   * SensorData findUniqueOrThrow
   */
  export type SensorDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * Filter, which SensorData to fetch.
     */
    where: SensorDataWhereUniqueInput
  }

  /**
   * SensorData findFirst
   */
  export type SensorDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * Filter, which SensorData to fetch.
     */
    where?: SensorDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorData to fetch.
     */
    orderBy?: SensorDataOrderByWithRelationInput | SensorDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorData.
     */
    cursor?: SensorDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorData.
     */
    distinct?: SensorDataScalarFieldEnum | SensorDataScalarFieldEnum[]
  }

  /**
   * SensorData findFirstOrThrow
   */
  export type SensorDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * Filter, which SensorData to fetch.
     */
    where?: SensorDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorData to fetch.
     */
    orderBy?: SensorDataOrderByWithRelationInput | SensorDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorData.
     */
    cursor?: SensorDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorData.
     */
    distinct?: SensorDataScalarFieldEnum | SensorDataScalarFieldEnum[]
  }

  /**
   * SensorData findMany
   */
  export type SensorDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * Filter, which SensorData to fetch.
     */
    where?: SensorDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorData to fetch.
     */
    orderBy?: SensorDataOrderByWithRelationInput | SensorDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SensorData.
     */
    cursor?: SensorDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorData.
     */
    skip?: number
    distinct?: SensorDataScalarFieldEnum | SensorDataScalarFieldEnum[]
  }

  /**
   * SensorData create
   */
  export type SensorDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * The data needed to create a SensorData.
     */
    data: XOR<SensorDataCreateInput, SensorDataUncheckedCreateInput>
  }

  /**
   * SensorData createMany
   */
  export type SensorDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SensorData.
     */
    data: SensorDataCreateManyInput | SensorDataCreateManyInput[]
  }

  /**
   * SensorData createManyAndReturn
   */
  export type SensorDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * The data used to create many SensorData.
     */
    data: SensorDataCreateManyInput | SensorDataCreateManyInput[]
  }

  /**
   * SensorData update
   */
  export type SensorDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * The data needed to update a SensorData.
     */
    data: XOR<SensorDataUpdateInput, SensorDataUncheckedUpdateInput>
    /**
     * Choose, which SensorData to update.
     */
    where: SensorDataWhereUniqueInput
  }

  /**
   * SensorData updateMany
   */
  export type SensorDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SensorData.
     */
    data: XOR<SensorDataUpdateManyMutationInput, SensorDataUncheckedUpdateManyInput>
    /**
     * Filter which SensorData to update
     */
    where?: SensorDataWhereInput
    /**
     * Limit how many SensorData to update.
     */
    limit?: number
  }

  /**
   * SensorData updateManyAndReturn
   */
  export type SensorDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * The data used to update SensorData.
     */
    data: XOR<SensorDataUpdateManyMutationInput, SensorDataUncheckedUpdateManyInput>
    /**
     * Filter which SensorData to update
     */
    where?: SensorDataWhereInput
    /**
     * Limit how many SensorData to update.
     */
    limit?: number
  }

  /**
   * SensorData upsert
   */
  export type SensorDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * The filter to search for the SensorData to update in case it exists.
     */
    where: SensorDataWhereUniqueInput
    /**
     * In case the SensorData found by the `where` argument doesn't exist, create a new SensorData with this data.
     */
    create: XOR<SensorDataCreateInput, SensorDataUncheckedCreateInput>
    /**
     * In case the SensorData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SensorDataUpdateInput, SensorDataUncheckedUpdateInput>
  }

  /**
   * SensorData delete
   */
  export type SensorDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
    /**
     * Filter which SensorData to delete.
     */
    where: SensorDataWhereUniqueInput
  }

  /**
   * SensorData deleteMany
   */
  export type SensorDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorData to delete
     */
    where?: SensorDataWhereInput
    /**
     * Limit how many SensorData to delete.
     */
    limit?: number
  }

  /**
   * SensorData without action
   */
  export type SensorDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorData
     */
    select?: SensorDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorData
     */
    omit?: SensorDataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SensorDataScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    temperature: 'temperature',
    humidity: 'humidity',
    pressure: 'pressure',
    rssi: 'rssi',
    uptime: 'uptime',
    heapFree: 'heapFree',
    lastError: 'lastError',
    createdAt: 'createdAt'
  };

  export type SensorDataScalarFieldEnum = (typeof SensorDataScalarFieldEnum)[keyof typeof SensorDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    
  /**
   * Deep Input Types
   */


  export type SensorDataWhereInput = {
    AND?: SensorDataWhereInput | SensorDataWhereInput[]
    OR?: SensorDataWhereInput[]
    NOT?: SensorDataWhereInput | SensorDataWhereInput[]
    id?: StringFilter<"SensorData"> | string
    deviceId?: StringFilter<"SensorData"> | string
    temperature?: FloatFilter<"SensorData"> | number
    humidity?: FloatFilter<"SensorData"> | number
    pressure?: FloatFilter<"SensorData"> | number
    rssi?: IntNullableFilter<"SensorData"> | number | null
    uptime?: BigIntNullableFilter<"SensorData"> | bigint | number | null
    heapFree?: IntNullableFilter<"SensorData"> | number | null
    lastError?: StringNullableFilter<"SensorData"> | string | null
    createdAt?: DateTimeFilter<"SensorData"> | Date | string
  }

  export type SensorDataOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    rssi?: SortOrderInput | SortOrder
    uptime?: SortOrderInput | SortOrder
    heapFree?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SensorDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SensorDataWhereInput | SensorDataWhereInput[]
    OR?: SensorDataWhereInput[]
    NOT?: SensorDataWhereInput | SensorDataWhereInput[]
    deviceId?: StringFilter<"SensorData"> | string
    temperature?: FloatFilter<"SensorData"> | number
    humidity?: FloatFilter<"SensorData"> | number
    pressure?: FloatFilter<"SensorData"> | number
    rssi?: IntNullableFilter<"SensorData"> | number | null
    uptime?: BigIntNullableFilter<"SensorData"> | bigint | number | null
    heapFree?: IntNullableFilter<"SensorData"> | number | null
    lastError?: StringNullableFilter<"SensorData"> | string | null
    createdAt?: DateTimeFilter<"SensorData"> | Date | string
  }, "id">

  export type SensorDataOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    rssi?: SortOrderInput | SortOrder
    uptime?: SortOrderInput | SortOrder
    heapFree?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SensorDataCountOrderByAggregateInput
    _avg?: SensorDataAvgOrderByAggregateInput
    _max?: SensorDataMaxOrderByAggregateInput
    _min?: SensorDataMinOrderByAggregateInput
    _sum?: SensorDataSumOrderByAggregateInput
  }

  export type SensorDataScalarWhereWithAggregatesInput = {
    AND?: SensorDataScalarWhereWithAggregatesInput | SensorDataScalarWhereWithAggregatesInput[]
    OR?: SensorDataScalarWhereWithAggregatesInput[]
    NOT?: SensorDataScalarWhereWithAggregatesInput | SensorDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SensorData"> | string
    deviceId?: StringWithAggregatesFilter<"SensorData"> | string
    temperature?: FloatWithAggregatesFilter<"SensorData"> | number
    humidity?: FloatWithAggregatesFilter<"SensorData"> | number
    pressure?: FloatWithAggregatesFilter<"SensorData"> | number
    rssi?: IntNullableWithAggregatesFilter<"SensorData"> | number | null
    uptime?: BigIntNullableWithAggregatesFilter<"SensorData"> | bigint | number | null
    heapFree?: IntNullableWithAggregatesFilter<"SensorData"> | number | null
    lastError?: StringNullableWithAggregatesFilter<"SensorData"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SensorData"> | Date | string
  }

  export type SensorDataCreateInput = {
    id?: string
    deviceId: string
    temperature: number
    humidity: number
    pressure: number
    rssi?: number | null
    uptime?: bigint | number | null
    heapFree?: number | null
    lastError?: string | null
    createdAt?: Date | string
  }

  export type SensorDataUncheckedCreateInput = {
    id?: string
    deviceId: string
    temperature: number
    humidity: number
    pressure: number
    rssi?: number | null
    uptime?: bigint | number | null
    heapFree?: number | null
    lastError?: string | null
    createdAt?: Date | string
  }

  export type SensorDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    pressure?: FloatFieldUpdateOperationsInput | number
    rssi?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    heapFree?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SensorDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    pressure?: FloatFieldUpdateOperationsInput | number
    rssi?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    heapFree?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SensorDataCreateManyInput = {
    id?: string
    deviceId: string
    temperature: number
    humidity: number
    pressure: number
    rssi?: number | null
    uptime?: bigint | number | null
    heapFree?: number | null
    lastError?: string | null
    createdAt?: Date | string
  }

  export type SensorDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    pressure?: FloatFieldUpdateOperationsInput | number
    rssi?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    heapFree?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SensorDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    pressure?: FloatFieldUpdateOperationsInput | number
    rssi?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    heapFree?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SensorDataCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    rssi?: SortOrder
    uptime?: SortOrder
    heapFree?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
  }

  export type SensorDataAvgOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    rssi?: SortOrder
    uptime?: SortOrder
    heapFree?: SortOrder
  }

  export type SensorDataMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    rssi?: SortOrder
    uptime?: SortOrder
    heapFree?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
  }

  export type SensorDataMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    rssi?: SortOrder
    uptime?: SortOrder
    heapFree?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
  }

  export type SensorDataSumOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    rssi?: SortOrder
    uptime?: SortOrder
    heapFree?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}