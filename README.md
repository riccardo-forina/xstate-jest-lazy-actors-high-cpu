```
npm install
```

It will run two tests.

`npm run test:ok` will run `PaginatedResponse.machine.test.tsx` and execute in ~8s (on my machine).

`npm run test:high-cpu` will run `HighCpu.test.tsx`, doesn't output any progress at all, eventually it will crash with an heap error, while using a lot of CPU.

`npm run test:high-cpu-no-fake-timers` will run `HighCpuNoFakeTimers.test.tsx`, this test is like the previous one but without the time manipulation from Jest. Same outcome tho.

Sample heap crash:

```
<--- Last few GCs --->

[73873:0x118008000]   105956 ms: Mark-sweep 4069.7 (4128.3) -> 4055.4 (4130.0) MB, 3697.5 / 0.0 ms  (average mu = 0.105, current mu = 0.025) allocation failure scavenge might not succeed
[73873:0x118008000]   109786 ms: Mark-sweep 4071.6 (4130.0) -> 4057.3 (4131.5) MB, 3758.0 / 0.0 ms  (average mu = 0.064, current mu = 0.019) allocation failure scavenge might not succeed


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0x101317585 node::Abort() (.cold.1) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 2: 0x1000b25c9 node::Abort() [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 3: 0x1000b272f node::OnFatalError(char const*, char const*) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 4: 0x1001f6eb7 v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 5: 0x1001f6e53 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 6: 0x1003a6eb5 v8::internal::Heap::FatalProcessOutOfMemory(char const*) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 7: 0x1003a897a v8::internal::Heap::RecomputeLimits(v8::internal::GarbageCollector) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 8: 0x1003a4049 v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
 9: 0x1003a18e1 v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
10: 0x1003b019a v8::internal::Heap::AllocateRawWithLightRetrySlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
11: 0x1003b0221 v8::internal::Heap::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
12: 0x100376d57 v8::internal::FactoryBase<v8::internal::Factory>::NewFixedArrayWithFiller(v8::internal::Handle<v8::internal::Map>, int, v8::internal::Handle<v8::internal::Oddball>, v8::internal::AllocationType) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
13: 0x1005d0c1d v8::internal::Handle<v8::internal::NameDictionary> v8::internal::BaseNameDictionary<v8::internal::NameDictionary, v8::internal::NameDictionaryShape>::New<v8::internal::Isolate>(v8::internal::Isolate*, int, v8::internal::AllocationType, v8::internal::MinimumCapacity) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
14: 0x100590f43 v8::internal::JSObject::MigrateToMap(v8::internal::Isolate*, v8::internal::Handle<v8::internal::JSObject>, v8::internal::Handle<v8::internal::Map>, int) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
15: 0x1005acfd7 v8::internal::LookupIterator::TransitionToAccessorProperty(v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
16: 0x100589f83 v8::internal::JSObject::DefineAccessor(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
17: 0x100589d85 v8::internal::JSReceiver::ValidateAndApplyPropertyDescriptor(v8::internal::Isolate*, v8::internal::LookupIterator*, bool, v8::internal::PropertyDescriptor*, v8::internal::PropertyDescriptor*, v8::Maybe<v8::internal::ShouldThrow>, v8::internal::Handle<v8::internal::Name>) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
18: 0x100588edf v8::internal::JSReceiver::OrdinaryDefineOwnProperty(v8::internal::LookupIterator*, v8::internal::PropertyDescriptor*, v8::Maybe<v8::internal::ShouldThrow>) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
19: 0x100588b13 v8::internal::JSReceiver::OrdinaryDefineOwnProperty(v8::internal::Isolate*, v8::internal::Handle<v8::internal::JSObject>, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyDescriptor*, v8::Maybe<v8::internal::ShouldThrow>) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
20: 0x1005884f1 v8::internal::JSReceiver::DefineProperty(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
21: 0x1002a2f26 v8::internal::Builtin_ObjectDefineProperty(int, unsigned long*, v8::internal::Isolate*) [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
22: 0x100a8a9f9 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvOnStack_BuiltinExit [/Users/riccardoforina/.nvm/versions/node/v14.17.3/bin/node]
```